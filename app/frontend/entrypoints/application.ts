import "@hotwired/turbo-rails"
import { Application } from "@hotwired/stimulus";

const application = Application.start()

declare global {
  interface Window {
    Stimulus: typeof application
  }
}

application.debug = false;
window.Stimulus = application;