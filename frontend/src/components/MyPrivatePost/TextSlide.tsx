export default function TextSlide({ title, text }: { title: string; text?: string }) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-base">{text || "Loading..."}</p>
    </div>
  );
}