output "app_names" {
  value = [for a in azurerm_container_app.app : a.name]
}

output "app_ids" {
  value = { for app in azurerm_container_app.app : app.name => app.id }
}

