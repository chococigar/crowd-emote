<template>
    <div>
        <h1> Crowd Emote </h1>
        <canvas id="_canvas" ref="game" width="640" height="480" style="border: 1px solid black;"></canvas>
        <p>
            <button v-on:click="move('right')">Right</button>
            <button v-on:click="move('left')">Left</button>
            <button v-on:click="move('up')">Up</button>
            <button v-on:click="move('down')">Down</button>
        </p>
    </div>
</template>

<script>
    import io from "socket.io-client";
    export default {
        name: 'BlockGame',
        data() {
            return {
                socket: {},
                context: {},
                position: {
                    x: 0,
                    y: 0
                }
            }
        },
        created() { 
            this.socket = io("http://localhost:3000");
            window.addEventListener('keydown', (e) => {
                switch(e.key) {
                    case "ArrowUp": {
                        this.move('up');
                        break;
                    }
                    case "ArrowDown": {this.move('down');break;}
                    case "ArrowLeft": {this.move('left');break;}
                    case "ArrowRight": {this.move('right');break;}
                }
            });

        },
        mounted() {
            this.context = this.$refs.game.getContext("2d");
            this.socket.on("position", data => {
                console.log(data);
                this.position = data;
                this.context.clearRect(0, 0, this.$refs.game.width, this.$refs.game.height);
                this.context.fillStyle = "rgba(0, 0, 0, 0)";//"#FFFFFF";
                this.context.fillRect(0, 0, this.$refs.game.width, this.$refs.game.width);
                this.context.fillStyle = "#FFFFFF";
                this.context.fillRect(this.position.x, this.position.y, 20, 20);
            });

        },
        methods: { 
            move(direction) { this.socket.emit("move", direction); 
            },
        }
    }
</script>

<style>
    
    #_canvas{
        background: url(../assets/TIF_background.png);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
    }


</style>