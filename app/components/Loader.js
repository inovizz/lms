import React from 'react'

const style = {
  container: {
    height: '25vh',
    margin: 0,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pramatiLoader: {
    position: 'relative'
  },
  handRed: {
    width: '10px',
    height: '50px',
    borderRadius: '10px',
    position: 'absolute',
    transformOrigin: 'center calc(100% - 5px)',
    left: 'calc(50% - 5px)',
    top: 'calc(50% - 5px)',
    background: 'rgba(236,116,112,0.8)'
  },
  handAqua: {
    width: '10px',
    height: '50px',
    borderRadius: '10px',
    position: 'absolute',
    transformOrigin: 'center calc(100% - 5px)',
    left: 'calc(50% - 5px)',
    top: 'calc(50% - 5px)',
    background: 'rgba(108,205,235,0.8)',
    transform: 'rotateZ(120deg)'
  },
  handBlue: {
    width: '10px',
    height: '50px',
    borderRadius: '10px',
    position: 'absolute',
    transformOrigin: 'center calc(100% - 5px)',
    left: 'calc(50% - 5px)',
    top: 'calc(50% - 5px)',
    background: 'rgba(93,136,198,0.8)',
    transform: 'rotateZ(240deg)'
  }
}

const Loader = ({ text }) => (
  <div style={style.container}>
    <div style={style.pramatiLoader}>
      <div>{text}</div>
      <div className='handred' style={style.handRed}></div>
      <div className='handaqua' style={style.handAqua}></div>
      <div className='handblue' style={style.handBlue}></div>
    </div>
  </div>
)

export default Loader
