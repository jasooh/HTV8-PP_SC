const section_header = document.getElementById('top-header');
const green_circle = document.getElementById('green-circle');
const small_circle_1 = document.getElementById('small-circle-1');
const small_circle_2 = document.getElementById('small-circle-2');
const phone = document.getElementById('phone');

window.addEventListener('scroll', () => {
    const maxScroll = document.documentElement.scrollHeight;
    const scrolled = window.scrollY;
    const percentScrolled = (scrolled/maxScroll)*100;
    console.log(percentScrolled);
    if (percentScrolled > 5 && percentScrolled < 10) { // First stage
        section_header.classList.add('vertical-shrink');
        green_circle.classList.add('circle-scale');
        small_circle_1.classList.add('small-circle-1-pos-1');
        small_circle_2.classList.add('small-circle-2-pos-1');
        small_circle_2.innerHTML = "Offering on-demand service wherever you go.";
        phone.classList.add('phone-pos');
    } else if (percentScrolled > 10 && percentScrolled < 15) {
        section_header.classList.add('vertical-shrink');
        green_circle.classList.add('circle-scale');
        small_circle_2.innerHTML = "Familiar to use interface saves the need for adapting.";
        small_circle_1.classList.add('small-circle-1-pos-2');
        small_circle_2.classList.add('small-circle-2-pos-2');

        small_circle_1.classList.remove('small-circle-1-pos-1');
        small_circle_2.classList.remove('small-circle-2-pos-1');

        phone.setAttribute("src", "./Images/Phone2.png")
    } else if (percentScrolled > 15 && percentScrolled < 20) {
        section_header.classList.add('vertical-shrink');
        green_circle.classList.add('circle-scale');
        small_circle_2.innerHTML = "Ready to be helpful at the touch of your fingers, anytime.";
        small_circle_1.classList.add('small-circle-1-pos-3');
        small_circle_2.classList.add('small-circle-2-pos-3');
        
        small_circle_1.classList.remove('small-circle-1-pos-2');
        small_circle_2.classList.remove('small-circle-2-pos-2');
        phone.setAttribute("src", "./Images/Phone3.png")
    } else if (percentScrolled < 5) {
        section_header.classList.remove('vertical-shrink');
        green_circle.classList.remove('circle-scale');

        small_circle_1.classList.remove('small-circle-1-pos-1');
        small_circle_2.classList.remove('small-circle-2-pos-1');

        small_circle_1.classList.remove('small-circle-1-pos-2');
        small_circle_2.classList.remove('small-circle-2-pos-2');

        small_circle_1.classList.remove('small-circle-1-pos-3');
        small_circle_2.classList.remove('small-circle-2-pos-3');
        small_circle_2.innerHTML = "";
        phone.classList.remove('phone-pos');

        phone.setAttribute("src", "./Images/Phone.png")
    }
});