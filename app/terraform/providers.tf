provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
  tenant_id       = var.tenant_id
  client_id       = var.client_id
  client_secret   = var.client_secret
}

# The block that caused the invalid character error
terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      # This is the correct constraint to force the upgrade:
      version = ">= 0.0.0"
    }
  }
}