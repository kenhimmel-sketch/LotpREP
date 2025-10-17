interface ParkInfoProps {
  parkName: string;
  parkDescription: string;
  parkImage: string;
  parkHistory: string;
}

export default function ParkInfo({
  parkName,
  parkDescription,
  parkImage,
  parkHistory,
}: ParkInfoProps) {
  return (
    <div className="py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 text-center">
          About {parkName}
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-4 sm:mb-6" />

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 items-center">
          <div className="order-2 md:order-1">
            <h3 className="font-montserrat text-xl sm:text-2xl font-semibold text-foreground mb-2 sm:mb-3">
              Park Heritage
            </h3>
            <p className="text-sm sm:text-base text-foreground/80 mb-3 sm:mb-4 leading-relaxed">
              {parkDescription}
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {parkHistory}
            </p>
          </div>

          <div className="relative h-64 sm:h-80 md:h-96 rounded-md overflow-hidden border-2 border-primary/30 order-1 md:order-2">
            <img
              src={parkImage}
              alt={parkName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
