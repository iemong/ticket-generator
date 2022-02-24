export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    if (src === '') reject()

    const img = new Image()
    img.addEventListener(
      'load',
      () => {
        resolve(img)
      },
      {
        passive: true,
      }
    )
    img.crossOrigin = 'Anonymous'
    img.src = src
  })
}

export const image2Blob = (
  image: HTMLImageElement
): Promise<Blob> | undefined => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (!context) return
  canvas.width = image.width
  canvas.height = image.height
  context.drawImage(image, 0, 0)
  return asyncMakeBlob(canvas)
}

export const asyncMakeBlob = (canvas: HTMLCanvasElement): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob === null) {
        reject()
        return
      }
      resolve(blob)
    }, 'image/jpeg')
  })
}
