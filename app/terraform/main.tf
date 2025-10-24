terraform {
  backend "azurerm" {
    resource_group_name  = "tfstate-rg"
    storage_account_name = "smartlearnstate089"
    container_name       = "tfstate"
    key                  = "terraform.tfstate"
  }
}

# ACR Module
module "acr" {
  source   = "./modules/acr"
  rg_name  = var.rg_name
  location = var.location
  acr_name = var.acr_name
}

# Container App Environment
resource "azurerm_container_app_environment" "env" {
  name                = "smart-learn-app-env"
  location            = var.location
  resource_group_name = var.rg_name
  identity {
    type = "SystemAssigned"
  }
}

# Assign AcrPull role to the environment identity
#resource "azurerm_role_assignment" "acr_pull" {
#  scope                = module.acr.acr_id # The ACR resource ID
#  role_definition_name = "AcrPull"
#  principal_id         = azurerm_container_app_environment.env.identity[0].principal_id
#  depends_on           = [azurerm_container_app_environment.env]
#}

#resource "null_resource" "role_assignment_delay" {
#  depends_on = [azurerm_role_assignment.acr_pull]

#  provisioner "local-exec" {
#    command = "sleep 300"
#  }
#}

# Container Apps Module
module "container_apps" {
  source   = "./modules/container_app"
  rg_name  = var.rg_name
  location = var.location
  env_id   = azurerm_container_app_environment.env.id
  app_name = var.app_name

  # Add these new inputs
  acr_login_server          = module.acr.acr_login_server
  env_identity_principal_id = azurerm_container_app_environment.env.identity[0].principal_id

#  depends_on = [
#    azurerm_role_assignment.acr_pull,
#    null_resource.role_assignment_delay,
#  ]

  containers = {
    "user-service" = {
      image   = "${module.acr.acr_login_server}/user-service:latest"
      env     = [{ name = "DB_HOST", value = var.db_host }]
      secrets = [{ name = "db-password", value = var.db_password }]
    }
    "course-service" = {
      image   = "${module.acr.acr_login_server}/course-service:latest"
      env     = [{ name = "DB_HOST", value = var.db_host }]
      secrets = [{ name = "db-password", value = var.db_password }]
    }
    "frontend" = {
      image   = "${module.acr.acr_login_server}/frontend:latest"
      env     = []
      secrets = []
    }
  }
}


# Notifications Module
module "notifications" {
  source  = "./modules/notifications"
  rg_name = var.rg_name
  email   = var.email
}

variable "app_names" {
  default = ["user-service", "course-service"]  # keys are known
}

# Monitor Alerts Module
module "monitor_alerts" {
  source          = "./modules/monitor_alerts"
  rg_name         = var.rg_name
  apps = { for app in var.app_names : app => module.container_apps.app_ids[app] }
  action_group_id = module.notifications.action_group_id
  depends_on = [module.container_apps]
}
