import { useEffect, useRef } from "react";

function VarCanvas({ color ="black"}) {
    const canvasRef = useRef(null);
    let ctx:CanvasRenderingContext2D;
    const varTypes = ["Boolean", "Byte", "Char", "Integer", "Float", "Long", "Double", "String"];
    const vars:circle[] = [];

    useEffect(() => {
        const canvas = canvasRef.current;
        //@ts-expect-error: getContext is exist
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ctx = canvas?.getContext("2d");

        let animationFrameId: number;

        const render = () => {
            Draw();
            animationFrameId = window.requestAnimationFrame(render);
        }

        render();

        

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        }
    }, [Draw]);

    function BackgroundColour(colour: string) {
        ctx.fillStyle = colour;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    function Draw() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        BackgroundColour(color);
        if (vars.length < varTypes.length) {
            vars.push(new circle(ctx, .1, Math.floor(Math.random() * ctx.canvas.width), Math.floor(Math.random() * ctx.canvas.height), varTypes[vars.length]));
        }
        else {
            for (let i = 0; i < vars.length; i++) {
                vars[i].update();
            }
        }
    }

    function BoundCollision(obj: circle) {
        const collisionSolver = {x: 1,y: 1};
        if (((obj.position.x + obj.radius) > ctx.canvas.width) || ((obj.position.x - obj.radius) < 0))
        {
            collisionSolver.x = -1;
        }

        if (((obj.position.y + obj.radius) > ctx.canvas.height) || ((obj.position.y - obj.radius) < 0)) {
            collisionSolver.y = -1;
        }

        obj.velocity.x *= collisionSolver.x;
        obj.velocity.y *= collisionSolver.y;
    }

    class circle {
        constructor(context: CanvasRenderingContext2D, radius: number, startCoordX: number, startCoordY: number, varTypeStr: string) {
            this.context = context;
            this.radius = radius;
            this.varTypeStr = varTypeStr;
            this.position.x = startCoordX;
            this.position.y = startCoordY;
        }
        context;
        varTypeStr;
        colour = (color=="black")?"white":"black";
        position = { x: 0, y: 0 };
        oldVelocity = {x: 0, y: 0};
        velocity = { x: Math.random(), y: Math.random()};
        acceleration = { x: -1/240, y: 1/60 };
        radius;

        draw() {
            this.context.strokeStyle = this.colour;
            this.context.fillStyle = this.colour;
            this.context.font = "30px Arial";
            this.context.fillText(this.varTypeStr, this.position.x, this.position.y);
            this.context.beginPath();
            this.context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            this.context.stroke();
        }

        update() {
            this.oldVelocity.x = this.velocity.x;
            this.oldVelocity.y = this.velocity.y;

            this.velocity.x += this.acceleration.x;
            this.velocity.y += this.acceleration.y;

            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;

            BoundCollision(this);

            this.draw();
        }
    }

    return <canvas className="VarCanvas" ref={canvasRef} width="480" height="720" />
}

export default VarCanvas;