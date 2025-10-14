output "acr_login_server" {
  value = module.acr.acr_login_server
}

output "container_apps" {
  value = module.container_apps.app_names
}

output "action_group_id" {
  value = module.notifications.action_group_id
}

output "cpu_alert_ids" {
  value = module.monitor_alerts.metric_alert_ids
}
