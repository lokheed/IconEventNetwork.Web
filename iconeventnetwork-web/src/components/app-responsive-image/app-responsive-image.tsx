import { Component, Host, h, Prop } from '@stencil/core';
import { ImageFormatInfo, ImageInfo } from '../../services/clients/client-base';
import { noImageDataUrl } from '../../utils/images-fallback';

@Component({
  tag: 'app-responsive-image',
  styleUrl: 'app-responsive-image.scss',
  shadow: false,
})
export class AppResponsiveImage {
  /** The ImageInfo for this responsive image. */
  @Prop() image!: ImageInfo;
  
  /** The css class to pass down to the rendered image. */
  @Prop() class: string;

  /** The url to use if the image does not exist. */
  @Prop() noImageDataUrl: string = noImageDataUrl;

  /** If specified, will get only the smallest image that satisfies this width. */
  @Prop() expectedWidth: number;

  private getImage() {
    if (!this.image.data.attributes.formats) {
      return (
        <img
          src={this.image.data.attributes.url}
          alt={this.image.data.attributes.alternativeText}
          class={this.class}
        />
      );
    }

    let entries = Object.entries(this.image.data.attributes.formats) as [string, ImageFormatInfo][];
    let sortedEntries = entries.sort((a, b) => a[1].width - b[1].width);

    if (this.expectedWidth != undefined)
    {
      let entry = sortedEntries.find(e => e[1].width >= this.expectedWidth);
      if (entry) {
        return (
          <img
            src={entry[1].url}
            alt={this.image.data.attributes.alternativeText}
            class={this.class}
          />
        );
      }
      // no entry larger than expected width, return raw image instead which will be largest
      return (
        <img
          src={this.image.data.attributes.url}
          alt={this.image.data.attributes.alternativeText}
          class={this.class}
        />
      );
    }

    return (
      <picture>
        {sortedEntries.map((item, index) => {
          if (index < sortedEntries.length - 1)
          {
            return <source media={`(max-width: ${item[1].width}px)`} srcSet={item[1].url} />
          }
          else
          {
            return <source media={`(min-width: ${item[1].width}px)`} srcSet={item[1].url} />
          }
        })}
        <img
          src={sortedEntries[0][1].url}
          alt={this.image.data.attributes.alternativeText}
          class={this.class}
        />
      </picture>
    )
  }

  render() {
    return (
      <Host>
        {this.image != undefined && this.image != null && this.image.data != null &&
          this.getImage()
        }
        {(this.image == undefined || this.image == null || this.image.data == null) &&
          <img
            src={this.noImageDataUrl}
            alt='No photo'
            class={this.class}
          />
        }
      </Host>
    );
  }

}
