/** one sound at a time on a page: whoever starts sounding says so, everyone else goes quiet */
export const AUDIO_EVENT = "bs-audio";
export const claimAudio = (who: string) => dispatchEvent(new CustomEvent(AUDIO_EVENT, { detail: who }));
