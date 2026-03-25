import { LAYOUT } from '@/shared/constants/tokens'
import { SectionLabel } from '@/shared/components/SectionLabel'
import { LinkCard } from '@/shared/components/LinkCard'
import { ABOUT_CERTS } from '../constants'

export function AboutCerts() {
  return (
    <div className={LAYOUT.spacing.compact}>
      <SectionLabel as="h3">Certificaciones</SectionLabel>
      <div className={LAYOUT.grid.cols2}>
        {ABOUT_CERTS.map((cert) => (
          <LinkCard
            key={cert.name}
            href={cert.href}
            title={cert.name}
            subtitle={cert.issuer}
            icon={cert.icon}
          />
        ))}
      </div>
    </div>
  )
}
