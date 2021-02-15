<template>
    <li
        :style="dotStyle"
        @click="draw"
        @mousemove="dragDraw"
        @mouseover="guideOn"
    >
        <GuideDot
            v-show="stampGuide != -1"
            class="guide"
            :stampGuide="stampGuide"
            :colorPalet="colorPalet"
        ></GuideDot>
    </li>
</template>

<script>
import { mapState } from "vuex";
import GuideDot from "./GuideDot.vue";
export default {
    components: {
        GuideDot
    },
    props: {
        inputColor: Number,
        dotId: Number,
        drawingJudgement: Boolean,
        lineDotVolume: Number,
        stampGuide: {
            type: Number,
            default: -1
        }
    },
    data() {
        return {
            dotStyle: {
                backgroundColor: "white",
                width: 0,
                height: 0
            },
            colorOfState: 0
        };
    },
    methods: {
        dragDraw() {
            if (this.drawingJudgement) {
                this.draw();
            }
        },
        draw() {
            if (
                ["brush", "line", "square", "squareline"].includes(
                    this.drawingTool
                )
            ) {
                this.colorOfState = this.drawingColor;
            } else if (this.drawingTool == "eraser") {
                this.colorOfState = 0;
            }
        },
        guideOn() {
            if (this.drawingTool == "stamp") {
                this.$emit("guideOn");
            }
        }
    },
    watch: {
        inputColor(val) {
            this.colorOfState = val;
        },
        colorOfState(val) {
            this.dotStyle.backgroundColor = this.colorPalet[val];
        },
        lineDotVolume(val) {
            this.dotStyle.width = 100 / val + "%";
            this.dotStyle.height = 100 / val + "%";
        },
        saveStatus() {
            this.$emit("saveProduct", {
                id: this.dotId,
                color: this.colorOfState
            });
        }
    },
    computed: mapState({
        drawingColor: state => state.maincanvas.drawingColor,
        drawingTool: state => state.maincanvas.drawingTool,
        saveStatus: state => state.maincanvas.saveStatus,
        colorPalet: state => state.maincanvas.paletColors
    })
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
li {
    transition-property: background-color;
    transition-duration: 0.3s;
    list-style: none;
    position: relative;
    div {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}
.guide {
    z-index: 20;
    opacity: 0.4;
}
</style>
