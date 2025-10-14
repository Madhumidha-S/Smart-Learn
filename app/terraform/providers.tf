provider "azurerm" {
  features {}
  subscription_id = "7a783723-bf93-4493-bca9-ea6a9d8202be"
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