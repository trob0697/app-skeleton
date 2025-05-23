resource "google_artifact_registry_repository" "app" {
  repository_id = "app"
  location      = var.region
  format        = "DOCKER"
  description   = "Docker images for ${var.app_name} (frontend + backend)"

  depends_on = [google_project_service.artifactregistry]
}

locals {
  registry_base = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.app.repository_id}"
}
