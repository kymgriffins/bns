  {/* Global Partners Marquee */}
      <section className="py-8 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <div className="flex items-center justify-center gap-2 text-white">
            <Handshake className="h-5 w-5" />
            <span className="text-sm font-medium">Our Global Partners Network</span>
          </div>
        </div>
        <Marquee pauseOnHover className="py-2" duration="30s">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="mx-6 flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2"
            >
              <div className={`h-8 w-8 rounded-full ${partner.color} flex items-center justify-center text-white text-xs font-bold`}>
                {partner.logo}
              </div>
              <span className="text-white text-sm font-medium whitespace-nowrap">{partner.name}</span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* Global Presence Stats */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
              <Globe className="h-6 w-6 text-blue-600" />
              Our Global Presence
            </h2>
            <p className="text-muted-foreground mt-2">Budget transparency across 47+ countries worldwide</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {globalPresence.map((location, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-card rounded-lg border">
                <span className="text-3xl">{location.flag}</span>
                <div>
                  <p className="font-semibold">{location.city}</p>
                  <p className="text-xs text-muted-foreground">{location.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advertisement Sponsors Marquee */}
      <section className="py-8 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <div className="flex items-center justify-center gap-2 text-white">
            <Award className="h-5 w-5" />
            <span className="text-sm font-medium">Our Sponsors & Partners</span>
            <Link href="/advertisements" className="text-xs bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded-full ml-2 transition">
              Advertise With Us
            </Link>
          </div>
        </div>
        <Marquee pauseOnHover className="py-2" duration="25s" reverse>
          {sponsors.map((sponsor, index) => (
            <div 
              key={index} 
              className="mx-6 flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2"
            >
              <span className="text-white text-sm font-medium whitespace-nowrap">{sponsor.name}</span>
              <span className="text-white/70 text-xs">—</span>
              <span className="text-white/90 text-sm italic">{sponsor.tagline}</span>
            </div>
          ))}
        </Marquee>
      </section>
