variable "rg_name" { type = string }
variable "location" { type = string }
variable "acr_name" { type = string }
variable "app_name" { type = string }
variable "db_host" { type = string }
variable "db_password" { type = string }
variable "email" { type = string }

variable "client_id" {}
variable "client_secret" {}
variable "tenant_id" {}
variable "subscription_id" {}

variable "apps" {
  description = "Map of app names to their container app IDs"
  type        = map(string)
  default = {
    "user-service"   = "/subscriptions/7a783723-bf93-4493-bca9-ea6a9d8202be/resourceGroups/smart-learn-rg/providers/Microsoft.App/containerApps/user-service"
    "course-service" = "/subscriptions/7a783723-bf93-4493-bca9-ea6a9d8202be/resourceGroups/smart-learn-rg/providers/Microsoft.App/containerApps/course-service"
  }
}
