import { directive } from "@/directives"
import Alpine from '@alpinejs/csp'

directive('init', ({ el, directive }) => {
    let fullMethod = directive.expression ?? '$refresh'

    Alpine.evaluate(el, `$wire.${fullMethod}`)
})

