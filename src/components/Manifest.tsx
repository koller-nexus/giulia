import { useI18n } from '../i18n'

export function Manifest() {
  const { t } = useI18n()

  return (
    <div className="manifest">
      <p>{t.manifest.prose}</p>
      <span className="manifest-node">{t.manifest.node}</span>
    </div>
  )
}