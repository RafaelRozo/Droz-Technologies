"use client";

export default function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.15} color="#ffffff" />
      <directionalLight position={[5, 8, 5]} intensity={0.3} color="#ffffff" />
    </>
  );
}
