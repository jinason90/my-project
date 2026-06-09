interface WeekCommentProps {
  comment: string
}

export default function WeekComment({ comment }: WeekCommentProps) {
  if (!comment) return null
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      background: '#1C1E2E',
      border: '1px solid #2A2D3E',
      borderLeft: '3px solid #E31837',
      borderRadius: 8,
      padding: '10px 16px',
      marginBottom: 16,
    }}>
      <span style={{ fontSize: 10, color: '#E31837', flexShrink: 0 }}>◆</span>
      <span style={{
        fontSize: 13,
        fontWeight: 500,
        color: '#8B90A7',
        fontStyle: 'italic',
        lineHeight: 1.5,
      }}>
        {comment}
      </span>
    </div>
  )
}
