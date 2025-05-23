# ── GCP ───────────────────────────────────────────────────────────────────────
variable "project_id" {
  description = "GCP project ID"
  type        = string
}
variable "region" {
  description = "GCP region"
  type        = string
  default     = "us-east1"
}
variable "app_name" {
  description = "Application name used for resource naming"
  type        = string
}
variable "domain" {
  description = "Custom domain for the application"
  type        = string
}

# ── Image tags ────────────────────────────────────────────────────────────────
variable "backend_image_tag" {
  description = "Docker image tag for the backend service"
  type        = string
  default     = "latest"
}
variable "frontend_image_tag" {
  description = "Docker image tag for the frontend service"
  type        = string
  default     = "latest"
}

# ── Database ──────────────────────────────────────────────────────────────────
variable "db_name" {
  description = "PostgreSQL database name"
  type        = string
  default     = "postgres"
}
variable "db_user" {
  description = "PostgreSQL database user"
  type        = string
  default     = "postgres"
}
variable "db_password" {
  description = "PostgreSQL database password"
  type        = string
  sensitive   = true
}
variable "db_tier" {
  description = "Cloud SQL machine tier"
  type        = string
  default     = "db-g1-small"
}

# ── Security ──────────────────────────────────────────────────────────────────
variable "encryption_key" {
  description = "Application-level encryption key"
  type        = string
  sensitive   = true
}

# ── Clerk ─────────────────────────────────────────────────────────────────────
variable "clerk_publishable_key" {
  description = "Clerk publishable key"
  type        = string
}
variable "clerk_secret_key" {
  description = "Clerk secret key"
  type        = string
  sensitive   = true
}
variable "clerk_webhook_secret" {
  description = "Clerk webhook signing secret"
  type        = string
  sensitive   = true
}
variable "clerk_admin_user_id" {
  description = "Clerk user ID of the initial admin user (used for seeding the database)"
  type        = string
  sensitive   = true
}
