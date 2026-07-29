import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import {
  CertificateSpotlight,
  type CertificateSpotlightCopy,
} from "@/components/room/certificate-spotlight";

const copy: CertificateSpotlightCopy = {
  triggerEyebrow: "Recruiter credentials",
  triggerTitle: "Certificates",
  triggerAction: "Browse all 37",
  open: "Open my certificate library",
  eyebrow: "Credential file / Certificate library",
  close: "Close certificate library",
  title: "My certificate library",
  description: "Browse my completed programs and courses.",
  selectedLabel: "Selected credential",
  galleryLabel: "All certificates",
  selectCertificate: "View certificate",
  certificateCount: "certificates",
};

describe("CertificateSpotlight", () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = function showModal() {
      this.setAttribute("open", "");
    };
    HTMLDialogElement.prototype.close = function close() {
      this.removeAttribute("open");
      this.dispatchEvent(new Event("close"));
    };
  });

  it("opens all certificates and selects another credential in place", async () => {
    const user = userEvent.setup();
    render(<CertificateSpotlight locale="en" copy={copy} active />);

    await user.click(screen.getByRole("button", { name: copy.open }));

    expect(screen.getByRole("dialog", { name: copy.title })).toHaveAttribute(
      "open",
    );
    const certificateButtons = screen.getAllByRole("button", {
      name: /^View certificate:/,
    });
    expect(certificateButtons).toHaveLength(37);

    await user.click(certificateButtons[1]!);
    expect(
      screen.getByRole("heading", { name: /Business English Track · DEPI/ }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: copy.close }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
