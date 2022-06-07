import React from 'react'

export default function FilterItem({tooltip, backgroundColor, onClick}) {
  const styles = {
    display: 'flex',
    width: '30px',
    height: '30px',
    padding: '6px',
    border: '1px solid #ccc',
    borderRadius: '2px',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dfdfdf',
    color: '#9c9c9c',
    cursor: 'pointer',
  }

  const btnSyles = {
    padding: '6px',
    backgroundColor: '#dfdfdf',
    cursor: 'pointer',
    fontSize: '12px',
    borderRadius: '2px',
  }

  return (
    <>
      {tooltip !== 'image' ? 
      <div title={tooltip} onClick={onClick} style={{...styles, backgroundColor }}></div> 
      : <div onClick={onClick} style={{...btnSyles}}>选择背景</div>
      } 
    </>
  )
}
