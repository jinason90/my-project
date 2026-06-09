interface SectionBlockProps {
  title?: string
  children: React.ReactNode
  style?: React.CSSProperties
}

export default function SectionBlock({ title, children, style }: SectionBlockProps) {
  return (
    <div style={{ marginBottom: 32, ...style }}>
      {title && (
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
          color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 14,
        }}>
          {title}
        </div>
      )}
      {children}
    </div>
  )
}
