"use client";

import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export default function Photos2024() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [prefetchCache, setPrefetchCache] = useState([]); // ⭐ Prefetched images
  const [dialogOpen, setDialogOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const limit = 18;
  const loaderRef = useRef(null);
  const loadingRef = useRef(false);
  const pageRef = useRef(1);

  /** Update refs */
  useEffect(() => {
    loadingRef.current = loading;
    pageRef.current = page;
  }, [loading, page]);

  /** Load current page */
  const loadImages = async (pageNumber) => {
    if (loadingRef.current) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/photos/2024?page=${pageNumber}&limit=${limit}`);
      const data = await res.json();

      // Append immediately
      setImages((prev) => [...prev, ...(data.images || [])]);
      setPage(pageNumber);

      // ⭐ Prefetch next batch
      prefetchNextPage(pageNumber + 1);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  /** Prefetch next page silently (with hidden prerender) */
  const prefetchNextPage = async (nextPage) => {
    try {
      const res = await fetch(`/api/photos/2024?page=${nextPage}&limit=${limit}`);
      const data = await res.json();

      // ⭐ Preload and decode images early
      data.images?.forEach((url) => {
        const img = new Image();
        img.src = url; // browser downloads immediately
      });

      setPrefetchCache(data.images);
    } catch (e) {
      console.error("Prefetch failed:", e);
    }
  };

  /** Flush prefetched images to gallery instantly */
  const flushPrefetchIntoImages = () => {
    if (prefetchCache.length === 0) return;

    setImages((prev) => [...prev, ...prefetchCache]);
    setPage((p) => p + 1);

    // Clear cache and schedule a new one
    prefetchNextPage(pageRef.current + 2);
    setPrefetchCache([]);
  };

  /** Initial load */
  useEffect(() => {
    loadImages(1);
  }, []);

  /** Observe loader element */
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !loadingRef.current) {
          // ⭐ Use prefetched data instantly
          if (prefetchCache?.length > 0) {
            flushPrefetchIntoImages();
            return;
          }
          // Fallback: normal load
          loadImages(pageRef.current + 1);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [prefetchCache]);

  const openDialog = (index) => {
    setStartIndex(index);
    setDialogOpen(true);
  };

  const closeDialog = () => setDialogOpen(false);

  return (
    <div
      className="
    min-h-screen px-[10%] sm:px-[20%]
    bg-[url('/images/bg.jpg')]
    bg-repeat-y
    bg-top
  "
    >
      <h1 className="text-5xl font-bold mb-4 text-white p-5 pt-14">2024 Photos</h1>

      <div className="columns-2 sm:columns-3 lg:columns-4 gap-4">
        {images.map((src, index) => (
          <img key={src + index} src={src} className="mb-4 w-full rounded-lg cursor-pointer" onClick={() => openDialog(index)} />
        ))}

        {/* Skeletons */}
        {loading && Array.from({ length: 6 }).map((_, i) => <div key={i} className="mb-4 w-full h-40 bg-gray-200 rounded-lg animate-pulse" />)}
      </div>

      <div ref={loaderRef} className="py-6 flex justify-center text-gray-600">
        {loading ? "Ачааллаж байна…" : ""}
      </div>

      {/* ⭐ Invisible prerender container */}
      <div className="absolute opacity-0 h-0 w-0 overflow-hidden -z-50 pointer-events-none">
        {prefetchCache?.map((url, i) => (
          <img key={url + i} src={url} />
        ))}
      </div>

      {/* Dialog */}
      {dialogOpen && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50" onClick={closeDialog}>
          <div className="relative w-[90%] max-w-[900px]" onClick={(e) => e.stopPropagation()}>
            <Swiper modules={[Navigation]} navigation initialSlide={startIndex} className="h-[80vh]">
              {images.map((src, i) => (
                <SwiperSlide key={src + i}>
                  <img src={src} className="w-full h-full object-contain" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
}
