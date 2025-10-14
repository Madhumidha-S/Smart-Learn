resource "azurerm_monitor_action_group" "email_alert" {
  name                = "email-action-group"
  resource_group_name = var.rg_name
  short_name          = "emailAG"

  email_receiver {
    name                  = "admin"
    email_address         = var.email
  }
}
