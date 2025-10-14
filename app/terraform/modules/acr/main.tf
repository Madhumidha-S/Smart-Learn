resource "azurerm_container_registry" "acr" {
  name                     = var.acr_name
  resource_group_name      = var.rg_name
  location                 = var.location
  sku                      = "Basic"
  admin_enabled            = true
  public_network_access_enabled = true
}
