$(function () {
  $('#searchZipCode').change(function () {
    const context = this

    search(context)
  })

  function search(context) {
    let zipCode = $('#zipCode', context).val()

    zipCode = zipCode.replace('.', '').replace('-', '')

    let district = $('#district', context)
    let city = $('#city', context)
    let address = $('#address', context)
    let state = $('#state', context)

    const viacep = `https://viacep.com.br/ws/${zipCode}/json/`

    if (zipCode !== '') {
      $.get(viacep, $(context).serialize(), function (data) {
          if (data.erro) {
            swal('Oops!', 'O CEP informado está incorreto', 'warning')
            return
          }

          district.val(data.bairro)
          city.val(data.localidade)
          address.val(data.logradouro)
          state.val(data.uf)
        }, 'json')
        .fail(function () {
          swal('Oops!', 'O CEP informado não foi encontrado', 'warning')
        })
    }
  }
})