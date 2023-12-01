import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRightCircleIcon,
  ArrowLeftCircleIcon,
} from '@heroicons/react/20/solid';

export default function Carousel() {
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'image1',
    },
    {
      src: 'https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'image2',
    },
    {
      src: 'https://images.unsplash.com/photo-1476458393436-fb857cc4c7b5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'image3',
    },
    {
      src: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'image4',
    },
    {
      src: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'image5',
    },
  ];

  // useState for the index of the image to be displayed
  const [imageIndex, setImageIndex] = useState(0);
  // useState for the timeout (to be cleared when user change via buttons or mouseover)
  const [autoplay, setAutoplay] = useState<number | null>(null);
  // useState for the autoplayOn (to be toggled when user mouseover)
  const [autoplayOn, setAutoplayOn] = useState(true);

  const next = () => {
    setImageIndex(imageIndex + 1 > images.length - 1 ? 0 : imageIndex + 1);
  };

  const prev = () => {
    setImageIndex(imageIndex - 1 < 0 ? images.length - 1 : imageIndex - 1);
  };

  const startAutoPlay = () => {
    setAutoplay(
      setTimeout(() => {
        next();
        setAutoplayOn(!autoplayOn);
      }, 2000),
    );
  };

  const stopAutoplay = () => {
    console.log('stop');
    clearTimeout(autoplay as number);
  };

  const resumeAutoplay = () => {
    console.log('resume');
    startAutoPlay();
  };

  useEffect(() => {
    console.log('starting');
    startAutoPlay();

    return () => {
      clearTimeout(autoplay as number);
    };
  }, [autoplayOn]);

  const handleKeyboard = (key: string) => {
    stopAutoplay()
    switch (key) {
        case 'ArrowLeft':
            prev();
            break;
        case 'ArrowRight':
            next();
            break;
        default:
            break;
        }
  }

  return (
    <section tabIndex={0} onKeyDown={(event) => handleKeyboard(event.key)} className="grid min-h-[100dvh] place-items-center px-4">
      <div>
        <AnimatePresence>
          <div className="relative">
            <motion.div
              className="overflow-hidden rounded-xl bg-slate-300 drop-shadow-lg"
              key={crypto.randomUUID()}
              
              
            >
              <p className="absolute top-0 z-10 p-5  text-7xl font-bold text-gray-600 mix-blend-normal">
                {imageIndex + 1}
              </p>
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onWheel={(event) => (event.deltaY < 0 ? prev() : next())}
                className="rounded-lg"
                onMouseEnter={stopAutoplay}
                onMouseLeave={resumeAutoplay}
                src={images[imageIndex].src}
                alt={images[imageIndex].alt}
              />
            </motion.div>
          </div>
        </AnimatePresence>
        <div
          className="mt-2 flex items-center justify-between min-w-full"
          onMouseEnter={stopAutoplay}
          onMouseLeave={resumeAutoplay}
        >
          <button onClick={prev}>
            <ArrowLeftCircleIcon className="h-8 w-8 drop-shadow-lg" />
          </button>
          <button onClick={next}>
            <ArrowRightCircleIcon className="h-8 w-8 drop-shadow-lg" />
          </button>
        </div>
      </div>
    </section>
  );
}
