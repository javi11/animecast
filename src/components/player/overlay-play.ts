import { Component, OnInit, Input, ElementRef, ViewEncapsulation, OnChanges, SimpleChange } from '@angular/core';
import {VgAPI} from 'videogular2/core';

@Component({
    selector: 'overlay-play',
    encapsulation: ViewEncapsulation.None,
    template: `<div class="vg-overlay-play">
            <div (click)="onClick($event)" class="overlay-play-container"
             [class.vg-icon-pause]="getState() === 'playing'"
             [class.vg-icon-play_arrow]="getState() === 'paused' || getState() === 'ended'">
            </div>
            <div [hidden]="!aspectRatio" class="aspect-ratio">Aspect Ratio: {{aspectRatio}}</div>
        </div>`,
    styles: [ `
        overlay-play {
            z-index: 220;
        }

        overlay-play .vg-overlay-play {
            transition: all 0.5s;
            cursor: pointer;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            width: 100%;
            height: 100%;
            font-size: 80px;
            filter: alpha(opacity=60);
            opacity: 0.6;
        }

        overlay-play .vg-overlay-play .overlay-play-container.vg-icon-play_arrow,
            overlay-play .vg-overlay-play .overlay-play-container.vg-icon-pause {
            width: 100px;
            height: 100px;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 80px;
            z-index: 220;
        }

        overlay-play .vg-overlay-play .aspect-ratio {
            width: 250px;
            height: 40px;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            z-index: 220;
            margin-top: 50px;
            background: #000;
        }

        overlay-play .vg-overlay-play:hover {
            filter: alpha(opacity=100);
            opacity: 1;
        }

        overlay-play .vg-overlay-play:hover .overlay-play-container.vg-icon-play_arrow:before {
            transform: scale(1.2);
        }
    ` ]
})
export class OverlayPlay implements OnInit, OnChanges {
    @Input() vgFor: string;
    @Input() aspectRatio: string;
    elem: HTMLElement;
    target: any;
    VG_ENDED:string = 'ended';
    VG_PAUSED:string = 'paused';
    VG_PLAYING:string = 'playing';
    VG_LOADING:string = 'waiting';
    hideTimeout:number = 2000;
    inactivityTimeout:any;

    constructor(ref: ElementRef, public API: VgAPI) {
        this.elem = ref.nativeElement;
    }

    ngOnInit() {
      this.API.playerReadyEvent.subscribe(() => this.onPlayerReady());
      // Remove aspect ratio message on load.
      this.aspectRatio = '';
    }

    onPlayerReady() {
        this.target = this.API.getMediaById(this.vgFor);
    }

    onClick() {
        let state = this.getState();

        switch (state) {
            case this.VG_PLAYING:
                this.target.pause();
                break;

            case this.VG_PAUSED:
                this.target.play();
                break;
        }
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        if(changes['aspectRatio']) {
            this.inactivityTimeout && clearTimeout(this.inactivityTimeout);
            this.aspectRatio = changes['aspectRatio'].currentValue;
            this.inactivityTimeout = setTimeout(() => {
                this.aspectRatio = '';
            }, this.hideTimeout);
        }
    }

    getState() {
        let state = this.VG_PAUSED;

        if (this.target) {
            if (this.target.state instanceof Array) {
                for (let i = 0, l = this.target.state.length; i < l; i++) {
                    if (this.target.state[ i ] === this.VG_PLAYING) {
                        state = this.VG_PLAYING;
                        break;
                    }
                }
            }
            else {
                state = this.target.state;
            }
        }

        return state;
    }
}