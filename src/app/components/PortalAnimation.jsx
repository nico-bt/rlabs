"use client"

import Lottie from "react-lottie"
import animationData from "../../lotties/circlesAnimation.json"
import animationData2 from "../../lotties/tunel.json"
import { useState, useRef, useEffect } from "react"

function PortalAnimation() {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    keepLastFrame: false,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice ",
    },
  }

  const circlesRef = useRef()
  const [isFinishedFirstAnimation, setIsFinishedFirstAnimation] = useState(false)
  const [isFinishedSecondAnim, setIsFinishedSecondAnim] = useState(false)
  const [restart, setRestart] = useState(false)

  // useEffect(() => {
  //   console.log(circlesRef.current)
  // }, [])

  // Obs:
  // Estuve renegando un rato para poder encontrar callback del tipo onCompleted o alguna flag en el lottie
  // Para saber cuando terminaba animación. Pero no me anduvo.
  // Por el momento lo hice a mano con tiempos y trackeando estados.

  useEffect(() => {
    // 12 segundos (en milisegundos) es lo que dura la 1era animación para después pasar a la que sigue
    // Estoy asumiendo que siempre corre en 60fps lottie. Si no la duración podría variar en monitores gamer
    const timeoutId1 = setTimeout(() => {
      setIsFinishedFirstAnimation(true)
    }, 12000)

    const timeoutId2 = setTimeout(() => {
      setIsFinishedSecondAnim(true)
    }, 16000)

    return () => {
      clearTimeout(timeoutId1)
      clearTimeout(timeoutId2)
    }
  }, [restart])

  const handleClick = () => {
    setIsFinishedFirstAnimation(false)
    setIsFinishedSecondAnim(false)
    setRestart(!restart)
  }

  return (
    <div className="lottie-shadow">
      {/* Circles */}
      {!isFinishedFirstAnimation && (
        <Lottie
          options={defaultOptions}
          isClickToPauseDisabled
          height={600}
          width={600}
          ref={circlesRef}
          onSegmentComplete={(e) => console.log(e)}
        />
      )}

      {/* Yellow Portal */}
      {isFinishedFirstAnimation && (
        <Lottie
          options={{ ...defaultOptions, animationData: animationData2 }}
          isClickToPauseDisabled
          height={600}
          width={600}
          keepLastFrame={false}
        />
      )}

      {/* Restart Button */}
      {isFinishedSecondAnim && (
        <button className="play_again_btn" onClick={handleClick}>
          Play Again
        </button>
      )}
    </div>
  )
}

export default PortalAnimation
