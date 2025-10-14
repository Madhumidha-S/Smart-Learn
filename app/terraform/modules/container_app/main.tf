resource "azurerm_container_app" "app" {
  for_each = var.containers

  name                         = each.key
  resource_group_name          = var.rg_name
  container_app_environment_id = var.env_id
  revision_mode                = "Single"

  # Add SystemAssigned identity to each Container App
  identity {
    type = "SystemAssigned"
  }

  # Tell the app which ACR to pull images from, and which identity to use
  registry {
    server   = var.acr_login_server
    identity = var.env_identity_principal_id
  }

  dynamic "secret" {
    for_each = lookup(each.value, "secrets", [])
    content {
      name  = secret.value.name
      value = secret.value.value
    }
  }

  template {
    container {
      name   = each.key
      image  = each.value.image
      cpu    = 0.25
      memory = "0.5Gi"

      dynamic "env" {
        for_each = lookup(each.value, "env", [])
        content {
          name  = env.value.name
          value = env.value.value
        }
      }
    }
  }
}
