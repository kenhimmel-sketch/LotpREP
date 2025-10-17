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
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-3 text-center">
          About {parkName}
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-6" />

        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="font-montserrat text-2xl font-semibold text-foreground mb-3">
              Park Heritage
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              {parkDescription}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {parkHistory}
            </p>
          </div>

          <div className="relative h-96 rounded-md overflow-hidden border-2 border-primary/30">
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
