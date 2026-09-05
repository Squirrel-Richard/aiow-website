import Image from "next/image";
import Link from "next/link";
import styles from "./QuietMonolithHero.module.css";

type Locale = "nl" | "en";

const content = {
  nl: {
    eyebrow: "Ontworpen rond uw werkelijkheid",
    title: <>AI die <em>voor u</em> werkt.</>,
    lead: "AIOW ontwerpt en bouwt één beheerst systeem voor uw werk, gebouw of woning.",
    cta: "Laat één proces of ruimte scannen",
    authority: "Eén systeem · U bepaalt",
    mobileAuthority: "U bepaalt altijd wat er gebeurt.",
    navLabel: "Kies uw omgeving",
    categories: [
      { title: "Werk", description: "Processen en digitale systemen", href: "/ai-automatisering" },
      { title: "Bedrijfspanden", description: "Gebouw, energie en toegang", href: "/smart-office" },
      { title: "Woningen & villa’s", description: "Comfort, klimaat en veiligheid", href: "/home" },
    ],
  },
  en: {
    eyebrow: "Designed around your reality",
    title: <>AI that works <em>for you</em>.</>,
    lead: "AIOW designs and builds one controlled system for your work, building or home.",
    cta: "Scan one process or space",
    authority: "One system · You decide",
    mobileAuthority: "You always decide what happens.",
    navLabel: "Choose your environment",
    categories: [
      { title: "Work", description: "Processes and digital systems", href: "/en/ai-automation" },
      { title: "Commercial buildings", description: "Building, energy and access", href: "/en/smart-office" },
      { title: "Homes & villas", description: "Comfort, climate and safety", href: "/en/home" },
    ],
  },
} as const;

export function QuietMonolithHero({ locale = "nl" }: { locale?: Locale }) {
  const c = content[locale];
  const scanHref = locale === "en" ? "/en/scan" : "/scan";

  return <section id={locale === "en" ? "solutions" : "oplossingen"} className={styles.hero} data-locale={locale}>
    <div className={styles.ambient} aria-hidden="true" />
    <div className={styles.copy}>
      <p className={styles.eyebrow}>{c.eyebrow}</p>
      <h1>{c.title}</h1>
      <p className={styles.lead}>{c.lead}</p>
      <Link className={styles.cta} href={scanHref}>{c.cta}<span aria-hidden="true">↗</span></Link>
      <p className={styles.mobileAuthority}>{c.mobileAuthority}</p>
    </div>

    <figure className={styles.visual}>
      <Image
        src="/aiow/quiet-monolith/hero.webp"
        alt=""
        fill
        priority
        sizes="(max-width: 700px) 100vw, 62vw"
        className={styles.image}
      />
      <span className={styles.seam} data-aiow-monolith-seam="true" aria-hidden="true" />
      <figcaption className={styles.srOnly}>Abstract AIOW-merkbeeld van één beheerst systeem.</figcaption>
    </figure>

    <p className={styles.authority}>{c.authority}</p>
    <nav className={styles.categories} aria-label={c.navLabel}>
      {c.categories.map((category) => <Link href={category.href} key={category.title}>
        <strong>{category.title}</strong>
        <span>{category.description}</span>
      </Link>)}
    </nav>
  </section>;
}
