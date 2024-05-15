import { sleep } from "../../utils";

export default {
  async getImages() {
    await sleep(500);

    return [
      "https://images.freeimages.com/images/large-previews/355/poppies-2-1334190.jpg?fmt=webp&h=350",
      "https://media.istockphoto.com/id/1435522417/photo/american-flag-close-up.jpg?s=2048x2048&w=is&k=20&c=O6Ts5W7MmBQrI-YSrLZ0YLpeufVsDBK-605dTVYEwW0=",
      "https://media.istockphoto.com/id/2026155202/photo/a-tricolor-mixed-breed-dog-listening-intently-with-a-foggy-background.jpg?s=2048x2048&w=is&k=20&c=y7dV1Ll4s7N8D2pDDtEkF_tIgBY3RSnLd0FlESGqcoQ=",
      "https://media.istockphoto.com/id/1589824836/photo/cute-brown-dog-that-smiles-isolated-background.jpg?s=2048x2048&w=is&k=20&c=GRzCQFRZ49wtR5o3dTsGJULKur0NtliJGsbFLllEmm0=",
      "https://media.istockphoto.com/id/1477563832/photo/happy-energetic-pet-corgi-dog-running-on-grass-in-a-nature-park-outdoors-having-fun-playing.jpg?s=2048x2048&w=is&k=20&c=8m7vfqXZTZQEbkcqkYuZsihpo-P6tGSaHKMySBvQsfo=",
    ];
  },
};
