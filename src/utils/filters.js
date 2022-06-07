export class ColorFilter {
  constructor(color) {
    this.color = color;
  }

  apply(_, context, width, height) {
    context.globalCompositeOperation = "destination-atop";
    context.fillStyle = this.color;
    context.fillRect(0, 0, width, height);
  }
}

export class BlurFilter {
  constructor(blur) {
    this.blur = blur;
  }

  apply(webcam, context, width, height) {
    context.globalCompositeOperation = "destination-atop";
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter
    context.filter = `blur(${this.blur}px)`;
    context.drawImage(webcam, 0, 0, width, height);
  }
}

export class CustomBackgroundImageFilter {
  constructor(image) {
    this.img = new Image();

    const fr = new FileReader();
    fr.onload = () => {
      this.img.src = fr.result;
    };
    fr.readAsDataURL(image);
  }

  apply(_, context, width, height) {
    const scale = Math.max(width / this.img.width, height / this.img.height);
    const x = width / 2 - (this.img.width / 2) * scale;
    const y = height / 2 - (this.img.height / 2) * scale;

    context.globalCompositeOperation = "destination-atop";
    context.drawImage(
      this.img,
      x,
      y,
      this.img.width * scale,
      this.img.height * scale
    );
  }
}
