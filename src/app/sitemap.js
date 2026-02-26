export default function sitemap() {
    const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL || "https://www.drsinghdental.com";

    const currentDate = new Date().toISOString();

    const staticRoutes = [
        { path: "", priority: 1.0, changeFrequency: "weekly" },
        { path: "/about", priority: 0.7, changeFrequency: "monthly" },
        { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
        { path: "/book-appointment", priority: 0.9, changeFrequency: "weekly" },
        { path: "/our-team", priority: 0.7, changeFrequency: "monthly" },
        { path: "/patient-stories", priority: 0.8, changeFrequency: "weekly" },
        { path: "/patient-stories/reviews", priority: 0.8, changeFrequency: "weekly" },
        { path: "/treatments", priority: 0.9, changeFrequency: "weekly" },
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

    const sitemapData = staticRoutes.map((route) => ({
        url: `${baseUrl}${route.path}`,
        lastModified: currentDate,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));

    const servicesSitemapData = treatmentServices.map((slug) => ({
        url: `${baseUrl}/treatments/services/${slug}`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.8,
    }));

    return [...sitemapData, ...servicesSitemapData];
}