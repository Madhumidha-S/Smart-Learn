output "metric_alert_ids" {
  value = values(azurerm_monitor_metric_alert.cpu_alert)[*].id
}
