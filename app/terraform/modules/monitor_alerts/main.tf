resource "azurerm_monitor_metric_alert" "cpu_alert" {
  for_each            = var.apps
  name                = "${each.key}-cpu-alert"
  resource_group_name = var.rg_name
  scopes              = [each.value]
  description         = "Alert if CPU > 80%"
  severity            = 3
  frequency           = "PT1M"
  window_size         = "PT5M"

  criteria {
    metric_namespace = "Microsoft.App/containerApps"
    metric_name      = "Cpu"
    aggregation      = "Average"
    operator         = "GreaterThan"
    threshold        = 80
  }

  action {
    action_group_id = var.action_group_id
  }
}
