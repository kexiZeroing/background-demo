import React from 'react'

export default function FiltersGroup({title, children}) {
  const styles = {
    group: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      padding: '16px',
    },
    filters: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
    }
  }

  return (
    <section style={styles.group}>
      <span>{title}</span>
      <div style={styles.filters}>{children}</div>
    </section>
  )
}
