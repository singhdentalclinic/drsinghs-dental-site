export const revalidate = 86400;
export default function sitemap() {
    const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL || "https://www.drsinghdental.com";

    const routes = [
        "",
        "/about",
        "/contact",
        "/book-appointment",
        "/our-team",
        "/patient-stories",
        "/patient-stories/reviews",
        "/treatments",
    ];

    const treatmentServices = [
        "root-canal-therapy",
        "dental-implants",
        "teeth-whitening",
        "dental-veneers",
        "preventive-care",
        "emergency-care",
        "orthodontics",
        "gum-treatment",
        "wisdom-tooth-extraction",
        "kids-dentistry",
        "dentures",
        "dental-crowns",
        "dental-braces",
        "aligners",
        "laser-dentistry",
        "tooth-jewel",
        "teeth-bleaching",
        "cbct-scan",
        "dental-restoration",
    ];

    const staticPages = routes.map((path) => ({
        url: `${baseUrl}${path}`,
        lastModified: new Date("2025-01-01"), // set real date if possible
    }));

    const servicePages = treatmentServices.map((slug) => ({
        url: `${baseUrl}/treatments/services/${slug}`,
        lastModified: new Date("2025-01-01"),
    }));

    return [...staticPages, ...servicePages];
}