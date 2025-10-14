variable "rg_name" { type = string }
variable "location" { type = string }
variable "env_id" { type = string }
variable "app_name" { type = string }

variable "containers" {
  type = map(object({
    image   : string
    env     : list(object({ name = string, value = string }))
    secrets : list(object({ name = string, value = string }))
  }))
}

variable "acr_login_server" {
  type = string
}

variable "env_identity_principal_id" {
  type = string
}
