class Abacus {
    constructor(canvas_id, number_of_bars = 10) {
        this.canvas = document.getElementById(canvas_id);
        this.ctx = this.canvas.getContext("2d");
        this.canvas_height = this.canvas.height;
        this.canvas_width = this.canvas.width;
        this.x_space_from_border = 10;//canvas_width * 0.1
        this.y_space_from_border = 10;//canvas_height * 0.2
        this.frame_height = 30;//canvas_height * 0.15
        this.frame_width = this.canvas_width - this.x_space_from_border * 2;
        this.number_of_bars = number_of_bars;
        this.space_between_bars = 3;
        this.bar_width = 2;
        this.bar_y_coord = this.y_space_from_border + this.frame_height;
        this.bar_height = this.canvas_height - (3 * this.y_space_from_border) - (2 * this.frame_height);
        this.clearAbacus()
        this.slider_width = ((this.canvas_width - (this.x_space_from_border * 2)) - (this.space_between_bars * (this.number_of_bars + 1))) / this.number_of_bars;
        this.top_frame_y_coord = this.y_space_from_border;
        this.mid_frame_y_coord = (this.canvas_height - (3 * this.y_space_from_border) - (2 * this.frame_height)) * 0.25 + this.frame_height + this.y_space_from_border;
        this.bottom_frame_y_coord = this.canvas_height - 2 * this.y_space_from_border - this.frame_height;
    }
    drawFrameCrossBars() {
        this.ctx.fillStyle = "saddlebrown";
        this.ctx.fillRect(this.x_space_from_border, this.top_frame_y_coord, this.frame_width, this.frame_height);
        this.ctx.fillRect(this.x_space_from_border, this.mid_frame_y_coord, this.frame_width, this.frame_height);
        this.ctx.fillRect(this.x_space_from_border, this.bottom_frame_y_coord, this.frame_width, this.frame_height);
    }
    drawFrameSlideBars() {
        this.ctx.fillStyle = "grey";
        var i;
        for (i = 0; i < this.number_of_bars; ++i) {
            var bar_x_coord = this.x_space_from_border + (this.slider_width / 2)  + (this.space_between_bars * (i + 1)) + (this.slider_width * i) - (this.bar_width / 2);
            this.ctx.fillRect(bar_x_coord, this.bar_y_coord, this.bar_width, this.bar_height);
        }
    }
    drawFrame() {
        this.drawFrameSlideBars();
        this.drawFrameCrossBars();
    }
    drawSlider(bar, bottom = true) {
        this.ctx.fillStyle = "green";
        var slider_height = this.slider_width * 0.25;
        if (bar > this.number_of_bars) {
            console.log("Tried to draw slider on non-existant bar");
        } else {
            var slider_x_coord = this.x_space_from_border + this.space_between_bars + ((bar - 1) * (this.slider_width + this.space_between_bars))
            var slider_y_coord;
            if (bottom) {
                slider_y_coord = (this.bottom_frame_y_coord - slider_height) - (this.sliders_on_lower_bar[bar -1][bottom] * slider_height);
            } else {
                slider_y_coord = (this.mid_frame_y_coord + this.frame_height) + (this.sliders_on_lower_bar[bar - 1][bottom] * slider_height);
            }
            this.ctx.fillRect(slider_x_coord, slider_y_coord, this.slider_width, slider_height);
            ++this.sliders_on_lower_bar[bar - 1][bottom];
        }
    }
    drawBar(bar, up, down) {
        for (var i = 1; i <= up; ++i) {
            this.drawSlider(bar, false);
        }
        for (var i = 1; i <= down; ++i) {
            this.drawSlider(bar, true);
        }
    }
    defaultSetup() {
        for (var i = 1; i <= this.number_of_bars; ++i){
            this.drawBar(i, 0, 10);
        }
    }
    pushUp(bar) {
        var lower_slider = this.sliders_on_lower_bar;
        --lower_slider[bar - 1][true];
        ++lower_slider[bar - 1][false];
        var upper_slider = this.sliders_on_upper_bar;
        this.clearAbacus()
        this.drawFrame()
        for (var i = 0; i < this.number_of_bars; ++i) {
            this.drawBar(i + 1, lower_slider[i][false], lower_slider[i][true]);
        }
    }
    pushDown(bar) {
        var lower_slider = this.sliders_on_lower_bar;
        ++lower_slider[bar - 1][true];
        --lower_slider[bar - 1][false];
        var upper_slider = this.sliders_on_upper_bar;
        this.clearAbacus()
        this.drawFrame()
        for (var i = 1; i <= this.number_of_bars; ++i) {
            this.drawBar(i, lower_slider[i - 1][false], lower_slider[i - 1][true]);
        }
    }
    clearAbacus() {
        this.ctx.clearRect(0, 0, this.canvas_width, this.canvas_width);
        this.sliders_on_lower_bar = [];
        this.sliders_on_upper_bar = [];
        for (var i = 0; i < this.number_of_bars; ++i) {
            this.sliders_on_lower_bar.push({true:0, false:0});
            this.sliders_on_upper_bar.push({true:0, false:0});
        }
    }
}