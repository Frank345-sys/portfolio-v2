import type { ReactDoctorConfig } from 'react-doctor/api'

export default {
  /** Rama de integración (gitflow); CI en PR usa `--diff origin/<base>` y prevalece sobre esto. */
  diff: 'develop',
  deadCode: false,
} satisfies ReactDoctorConfig
