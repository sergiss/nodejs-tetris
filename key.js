/**
 * 2022 Sergio Soriano - sergiosoriano.com
 */
 const RELEASED     = 0;
 const JUST_PRESSED = 1;
 const PRESSED      = 2;
 class Key {
 
     constructor(tgtHoldDownTime) {
         this.tgtHoldDownTime = tgtHoldDownTime;
         this.holdDownTime = 0;
         this.setState(RELEASED);
     }
 
     setState = function(state) {
         switch(state) {
             case JUST_PRESSED:
             case PRESSED:
                 this.state = state;
                 break;
             default:
                 this.state = RELEASED;
                 break;
         }
         this.holdDownTime = 0;
     }
 
     isReleased = function() {
         return this.state == RELEASED;
     }
 
     isJustPressed = function() {
         return this.state == JUST_PRESSED;
     }
 
     isPressed = function() {
         return this.state == PRESSED;
     }
 
     isHoldDown = function() {
         return this.isPressed && this.holdDownTime > this.tgtHoldDownTime;
     }
 
     addHoldDownTime = function(time) {
         this.holdDownTime += time;
     }
 
 }

 module.exports = { Key }