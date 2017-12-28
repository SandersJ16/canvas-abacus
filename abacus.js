class Abacus {
    constructor(canvas_id, {number_of_bars=10,frame_color="saddlebrown",bar_color="grey",slider_color="green",width="100%",height="100%"} = {}) {
        this.canvas = document.getElementById(canvas_id);

        this.setColors(frame_color, bar_color, slider_color);

        this.ctx = this.canvas.getContext("2d");
        this.canvas_height = this.canvas.height;
        this.canvas_width = this.canvas.width;

        this.x_space_from_border = 10;//canvas_width * 0.1
        this.y_space_from_border = 10;//canvas_height * 0.2

        this.frame_height = 30;//canvas_height * 0.15
        this.setWidth(width);
        //this.frame_width = this.canvas_width - this.x_space_from_border * 2;

        this.number_of_bars = number_of_bars;
        this.space_between_bars = 3;
        this.bar_width = 2;

        this.bar_y_coord = this.y_space_from_border;
        this.setHeight(height);
        //this.bar_height = this.canvas_height - (2 * this.y_space_from_border);

        this.clearAbacus()

        this.slider_width = (this.frame_width - (this.space_between_bars * (this.number_of_bars + 1))) / this.number_of_bars;
        this.top_frame_y_coord = this.y_space_from_border;
        //this.mid_frame_y_coord = (this.canvas_height - (3 * this.y_space_from_border) - (2 * this.frame_height)) * 0.25 + this.frame_height + this.y_space_from_border;
        this.mid_frame_y_coord = (this.bar_height * 0.25) + this.y_space_from_border + (this.frame_height * 0.5);
        //this.bottom_frame_y_coord = this.canvas_height - this.y_space_from_border - this.frame_height;
        this.bottom_frame_y_coord = this.bar_height + this.y_space_from_border - this.frame_height;
    }
    stringLengthToNumber(string_length, percentage_of_length) {
        var number_length;
        string_length = string_length.replace(/^\s+|\s+$/g, '');
        if (string_length.endsWith("%")) {
            var percentage = string_length.slice(0, -1).replace(/^\s+|\s+$/g, '');
            number_length = percentage_of_length * (percentage/ 100);
        } else if (string_length.endsWith("px")) {
            var pixels = string_length.slice(0, -2).replace(/^\s+|\s+$/g, '');
            number_length = pixels;
        } else {
            throw new Exception();
        }
        return number_length;
    }
    setHeight(height) {
        this.bar_height = this.stringLengthToNumber(height, this.canvas_height);
        this.bar_height -= this.y_space_from_border * 2;
    }
    setWidth(width) {
        this.frame_width = this.stringLengthToNumber(width, this.canvas_width);
        this.frame_width -= this.x_space_from_border * 2;
    }
    setColors(frame_color, bar_color, slider_color) {
        this.frame_color = frame_color;
        this.bar_color = bar_color;
        this.slider_color = slider_color;
    }
    drawFrameCrossBars() {
        this.ctx.fillStyle = this.frame_color;
        this.ctx.fillRect(this.x_space_from_border, this.top_frame_y_coord, this.frame_width, this.frame_height);
        this.ctx.fillRect(this.x_space_from_border, this.mid_frame_y_coord, this.frame_width, this.frame_height);
        this.ctx.fillRect(this.x_space_from_border, this.bottom_frame_y_coord, this.frame_width, this.frame_height);
    }
    drawFrameSlideBars() {
        this.ctx.fillStyle = this.bar_color;
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
    drawLowerSlider(bar, bottom = true) {
        this.drawSlider(bar, bottom, true);
    }
    drawUpperSlider(bar, bottom = true) {
        this.drawSlider(bar, bottom, false);
    }
    drawSlider(bar, bottom = true, lower = true) {
        this.ctx.fillStyle = "black";
        var slider_height = this.slider_width * 0.25;
        if (bar > this.number_of_bars) {
            console.log("Tried to draw slider on non-existant bar");
        } else {
            var slider_x_coord = this.x_space_from_border + this.space_between_bars + ((bar - 1) * (this.slider_width + this.space_between_bars));
            var slider_y_coord;
            var slider_counter;
            var lower_frame_coordinate;
            var upper_frame_coordinate;
            if (lower) {
                slider_counter = this.sliders_on_lower_bar;
                lower_frame_coordinate = this.bottom_frame_y_coord;
                upper_frame_coordinate = this.mid_frame_y_coord;
            } else {
                slider_counter = this.sliders_on_upper_bar;
                lower_frame_coordinate = this.mid_frame_y_coord;
                upper_frame_coordinate = this.top_frame_y_coord;
            }

            if (bottom) {
                slider_y_coord = (lower_frame_coordinate - slider_height) - (slider_counter[bar -1][bottom] * slider_height);
            } else {
                slider_y_coord = (upper_frame_coordinate + this.frame_height) + (slider_counter[bar - 1][bottom] * slider_height);
            }

            this.ctx.fillRect(slider_x_coord, slider_y_coord, this.slider_width, slider_height);
            this.ctx.fillStyle = this.slider_color;
            var outline_width = 1;
            this.ctx.fillRect(slider_x_coord + outline_width, slider_y_coord + outline_width, this.slider_width - outline_width * 2, slider_height - outline_width * 2);


            ++slider_counter[bar - 1][bottom];
        }
    }
    drawLowerBar(bar, up, down) {
        for (var i = 1; i <= up; ++i) {
            this.drawLowerSlider(bar, false);
        }
        for (var i = 1; i <= down; ++i) {
            this.drawLowerSlider(bar, true);
        }
    }
    drawUpperBar(bar, up, down) {
        for (var i = 1; i <= up; ++i) {
            this.drawUpperSlider(bar, false);
        }
        for (var i = 1; i <= down; ++i) {
            this.drawUpperSlider(bar, true);
        }
    }
    defaultSetup() {
        for (var i = 1; i <= this.number_of_bars; ++i){
            this.drawLowerBar(i, 0, 4);
        }
        for (var i = 1; i <= this.number_of_bars; ++i){
            this.drawUpperBar(i, 0, 1);
        }
    }
    pushUpLower(bar) {
        var lower_slider = this.sliders_on_lower_bar;
        --lower_slider[bar - 1][true];
        ++lower_slider[bar - 1][false];
        var upper_slider = this.sliders_on_upper_bar;
        this.clearAbacus()
        this.drawFrame()
        for (var i = 0; i < this.number_of_bars; ++i) {
            this.drawLowerBar(i + 1, lower_slider[i][false], lower_slider[i][true]);
        }
        for (var i = 0; i < this.number_of_bars; ++i) {
            this.drawUpperBar(i + 1, upper_slider[i][false], upper_slider[i][true]);
        }
    }
    pushDownLower(bar) {
        var lower_slider = this.sliders_on_lower_bar;
        ++lower_slider[bar - 1][true];
        --lower_slider[bar - 1][false];
        var upper_slider = this.sliders_on_upper_bar;
        this.clearAbacus()
        this.drawFrame()
        for (var i = 1; i <= this.number_of_bars; ++i) {
            this.drawLowerBar(i, lower_slider[i - 1][false], lower_slider[i - 1][true]);
        }
        for (var i = 1; i < this.number_of_bars; ++i) {
            this.drawUpperBar(i, upper_slider[i - 1][false], upper_slider[i - 1][true]);
        }
    }
    pushUpUpper(bar) {
        var lower_slider = this.sliders_on_lower_bar;
        var upper_slider = this.sliders_on_upper_bar;
        --upper_slider[bar - 1][true];
        ++upper_slider[bar - 1][false];
        this.clearAbacus()
        this.drawFrame()
        for (var i = 0; i < this.number_of_bars; ++i) {
            this.drawLowerBar(i + 1, lower_slider[i][false], lower_slider[i][true]);
        }
        for (var i = 0; i < this.number_of_bars; ++i) {
            this.drawUpperBar(i + 1, upper_slider[i][false], upper_slider[i][true]);
        }
    }
    pushDownUpper(bar) {
        var lower_slider = this.sliders_on_lower_bar;
        var upper_slider = this.sliders_on_upper_bar;
        ++upper_slider[bar - 1][true];
        --upper_slider[bar - 1][false];
        this.clearAbacus()
        this.drawFrame()
        for (var i = 1; i <= this.number_of_bars; ++i) {
            this.drawLowerBar(i, lower_slider[i - 1][false], lower_slider[i - 1][true]);
        }
        for (var i = 1; i < this.number_of_bars; ++i) {
            this.drawUpperBar(i, upper_slider[i - 1][false], upper_slider[i - 1][true]);
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
    setUpNumber(number) {
        this.clearAbacus();
        this.drawFrame();
        var place = 1;
        while (number * 10 >= Math.pow(10, place)) {
            var lower_up;
            var current_bar = this.number_of_bars - place + 1;
            var place_value = Math.floor((number % (Math.pow(10, place))) / Math.pow(10, place - 1));
             if (place_value >= 5) {
                lower_up = place_value - 5;
                this.drawUpperBar(current_bar, 1, 0);
            } else {
                lower_up = place_value;
                this.drawUpperBar(current_bar, 0, 1);
            }
            this.drawLowerBar(current_bar, lower_up, 4 - lower_up);
        //document.getElementById("error_log").innerHTML = lower_up;
            ++place;
        }
        for (var i = 1; i <= this.number_of_bars - place + 1; ++i) {
            this.drawUpperBar(i, 0, 1);
            this.drawLowerBar(i, 0 ,4);
        }
    }
}
