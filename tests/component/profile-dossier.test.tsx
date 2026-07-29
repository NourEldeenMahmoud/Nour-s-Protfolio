import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  ProfileDossier,
  type ProfileDossierCopy,
} from "@/components/room/profile-dossier";

const copy: ProfileDossierCopy = {
  triggerEyebrow: "Recruiter brief",
  triggerLabel: "Profile & CV",
  open: "Open my recruiter profile and CV",
  eyebrow: "Candidate dossier",
  close: "Close profile and CV",
  portraitAlt: "My portrait",
  fileNumber: "Candidate file / NE-001",
  title: "Nour Eldeen Mahmoud",
  role: "Junior .NET Backend / Full-Stack Developer",
  location: "Egypt",
  graduation: "Expected graduation / 2027",
  intro: "A concise profile for recruiters evaluating me.",
  downloadCv: "Download CV",
  emailAction: "Email me",
  navigation: "Profile sections",
  aboutNav: "About me",
  cvNav: "CV snapshot",
  contactNav: "Contact",
  focusLabel: "Primary focus",
  focusValue: ".NET backend",
  educationLabel: "Education",
  educationValue: "BSc in progress",
  locationLabel: "Location",
  aboutTitle: "An engineer with a clear center.",
  aboutBody: "I focus on dependable backend systems.",
  cvTitle: "The essentials, ready to scan.",
  cvIntro: "The full CV is available as a PDF.",
  degreeLabel: "Education / In progress",
  degree: "Bachelor in Computer Science",
  academy: "MET Academy, Mansoura, Egypt",
  trainingLabel: "Professional training / 6 months",
  training: "Digital Egypt Pioneers Initiative (DEPI)",
  skillsTitle: "Core technical fit",
  skills: ["ASP.NET Core", "Web API", "SQL Server"],
  evidenceTitle: "Continue the evaluation",
  evidenceBody: "Review my role-focused evidence.",
  hiringView: "Open project pinboard",
  caseStudies: "Explore selected work",
  contactEyebrow: "Contact / Next step",
  contactTitle: "Start a direct conversation.",
  contactBody: "Contact me directly.",
  email: "noureldeendev@gmail.com",
  whatsapp: "WhatsApp",
  telegram: "Telegram",
  linkedin: "LinkedIn",
  github: "GitHub",
};

describe("ProfileDossier", () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = function showModal() {
      this.setAttribute("open", "");
    };
    HTMLDialogElement.prototype.close = function close() {
      this.removeAttribute("open");
      this.dispatchEvent(new Event("close"));
    };
  });

  it("opens the recruiter dossier with direct CV and contact actions, then closes", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<ProfileDossier locale="en" copy={copy} onClose={onClose} />);

    expect(
      screen.getByRole("dialog", { name: "Nour Eldeen Mahmoud" }),
    ).toHaveAttribute("open");
    expect(screen.getByRole("link", { name: /Download CV/ })).toHaveAttribute(
      "href",
      "/learn/downloads/NourEldeen_CV.pdf",
    );
    expect(screen.getByRole("link", { name: "Email me" })).toHaveAttribute(
      "href",
      "mailto:noureldeendev@gmail.com",
    );
    expect(screen.getByRole("link", { name: /WhatsApp/ })).toHaveAttribute(
      "href",
      "https://wa.me/201556335858",
    );
    expect(screen.getByRole("link", { name: /Telegram/ })).toHaveAttribute(
      "href",
      "https://t.me/DevNourEldeen",
    );
    expect(
      screen.getByRole("link", { name: /Open project pinboard/ }),
    ).toHaveAttribute("href", "/en?focus=projects");
    expect(
      screen.getByRole("link", { name: /Explore selected work/ }),
    ).toHaveAttribute("href", "/en?focus=exploration");

    await user.click(
      screen.getByRole("button", { name: "Close profile and CV" }),
    );

    expect(onClose).toHaveBeenCalledOnce();
  });
});
