import { useState, useEffect } from "react"

type ServiceStats = {
  name: string
  actionsCount: number
  reactionsCount: number
}

const countServiceStats = (aboutData: any): ServiceStats[] => {  
  let servicesArray: any[] = []
  
  if (Array.isArray(aboutData)) {
    servicesArray = aboutData
  } else if (aboutData?.server?.services && Array.isArray(aboutData.server.services)) {
    servicesArray = aboutData.server.services
  } else if (aboutData?.services && Array.isArray(aboutData.services)) {
    servicesArray = aboutData.services
  }

  return servicesArray.map((service: any) => {
    const actionsCount = (service.actions && Array.isArray(service.actions)) ? service.actions.length : 0
    const reactionsCount = (service.reactions && Array.isArray(service.reactions)) ? service.reactions.length : 0
        
    return {
      name: service.name,
      actionsCount,
      reactionsCount
    }
  })
}

export default function ServicesPanel() {
  const [services, setServices] = useState<ServiceStats[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:8080/about.json")
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const data = await response.json()        
        const formattedServices = countServiceStats(data)
        
        setServices(formattedServices)
      } catch (err) {
        console.error("Error fetching services:", err)
        setError("Erreur lors du chargement des services")
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <p className="text-white text-lg">Chargement des services...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <p className="text-red-400 text-lg">{error}</p>
      </div>
    )
  }

  if (services.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <p className="text-white/60 text-lg">Aucun service trouvé</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {services.map((s) => (
        <div
          key={s.name}
          className="bg-[#1B264F] rounded-xl shadow p-6 hover:shadow-lg transition"
        >
          <h3 className="text-xl font-bold mb-4 text-white">{s.name}</h3>
          <div className="space-y-2">
            <p className="text-white/80">
              <span className="font-semibold">Actions:</span> {s.actionsCount}
            </p>
            <p className="text-white/80">
              <span className="font-semibold">Reactions:</span> {s.reactionsCount}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}