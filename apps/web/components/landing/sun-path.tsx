"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect, useState } from "react"

// Sun calculations
const calculateSunPosition = (date: Date, latitude: number, longitude: number) => {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
  const declination = 23.45 * Math.sin((360/365) * (dayOfYear - 81) * Math.PI / 180)
  const hourAngle = (12 - (date.getHours() + date.getMinutes()/60)) * 15

  // Calculate elevation
  const elevation = Math.asin(
    Math.sin(latitude * Math.PI/180) * Math.sin(declination * Math.PI/180) +
    Math.cos(latitude * Math.PI/180) * Math.cos(declination * Math.PI/180) * Math.cos(hourAngle * Math.PI/180)
  ) * 180/Math.PI

  // Calculate azimuth
  const azimuth = Math.acos(
    (Math.sin(declination * Math.PI/180) - Math.sin(latitude * Math.PI/180) * Math.sin(elevation * Math.PI/180)) /
    (Math.cos(latitude * Math.PI/180) * Math.cos(elevation * Math.PI/180))
  ) * 180/Math.PI

  return { elevation, azimuth }
}

// Calculate sunrise/sunset times
const calculateDayTimes = (date: Date, latitude: number, longitude: number) => {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
  const declination = 23.45 * Math.sin((360/365) * (dayOfYear - 81) * Math.PI / 180)
  
  // Hour angle at sunrise/sunset
  const hourAngle = Math.acos(
    -Math.tan(latitude * Math.PI/180) * Math.tan(declination * Math.PI/180)
  ) * 180/Math.PI

  // Convert to hours
  const hoursFromNoon = hourAngle / 15
  const noon = 12 - longitude/15 // Local solar noon

  return {
    sunrise: noon - hoursFromNoon,
    sunset: noon + hoursFromNoon,
  }
}

export const SunPath = () => {
  const [time, setTime] = useState(new Date())
  const [position, setPosition] = useState({ elevation: 0, azimuth: 0 })
  const [dayTimes, setDayTimes] = useState({ sunrise: 6, sunset: 18 })
  const [location, setLocation] = useState({ 
    latitude: 37.7749, // San Francisco default
    longitude: -122.4194,
    loading: true,
    error: null as string | null
  })
  const controls = useAnimation()
  
  // Get user's location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            loading: false,
            error: null
          })
        },
        (error) => {
          console.warn("Geolocation error:", error)
          setLocation(prev => ({ ...prev, loading: false, error: error.message }))
        }
      )
    }
  }, [])

  // Update sun position
  useEffect(() => {
    const updatePosition = () => {
      const now = new Date()
      const pos = calculateSunPosition(now, location.latitude, location.longitude)
      const times = calculateDayTimes(now, location.latitude, location.longitude)
      
      setTime(now)
      setPosition(pos)
      setDayTimes(times)

      // Convert to visualization coordinates
      const progress = (now.getHours() + now.getMinutes()/60 - 6) / 12 // 6am to 6pm
      const x = Math.sin(progress * Math.PI) * 100
      const y = -Math.cos(progress * Math.PI) * 50
      controls.start({ x, y })
    }

    updatePosition()
    const interval = setInterval(updatePosition, 1000)
    return () => clearInterval(interval)
  }, [location])

  // Format time as HH:MM
  const formatTime = (hours: number) => {
    const h = Math.floor(hours)
    const m = Math.round((hours - h) * 60)
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
  }

  return {
    view: (
      <div className="relative h-64 overflow-hidden rounded-xl">
        {/* Dynamic sky gradient based on sun position */}
        <div 
          className="absolute inset-0 bg-gradient-to-b transition-colors duration-1000"
          style={{
            backgroundImage: `linear-gradient(to bottom, 
              ${position.elevation > 30 ? 'rgb(59 130 246 / 0.2)' : 'rgb(234 88 12 / 0.2)'}, 
              ${position.elevation > 0 ? 'rgb(234 88 12 / 0.2)' : 'rgb(15 23 42 / 0.3)'}
            )`
          }}
        />
        
        {/* Sun path arc */}
        <svg className="absolute inset-0 w-full h-full" viewBox="-120 -60 240 120">
          {/* Golden hour indicators */}
          <path
            d="M -100 0 A 100 50 0 0 1 -50 -43"
            stroke="rgba(234, 88, 12, 0.3)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 50 -43 A 100 50 0 0 1 100 0"
            stroke="rgba(234, 88, 12, 0.3)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          
          {/* Main sun path */}
          <path
            d="M -100 0 A 100 50 0 0 1 100 0"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
          />
          
          {/* Sun */}
          <motion.circle
            animate={controls}
            initial={false}
            className="fill-yellow-500 drop-shadow-glow"
            r="8"
          />
        </svg>
        
        {/* Horizon line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20" />
      </div>
    ),
    data: {
      position,
      dayTimes: {
        sunrise: formatTime(dayTimes.sunrise),
        sunset: formatTime(dayTimes.sunset)
      },
      location: {
        ...location,
        name: "San Francisco" // You could use a reverse geocoding service here
      }
    }
  }
} 