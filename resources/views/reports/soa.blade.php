<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Statement of Applicability</title>
</head>
<body>
    <table>
        <thead>
            <tr>
            <th>Control Number</th>
            <th>Control Name</th>
            <th>Applicability</th>
            <th>Justification</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($parent_sections as $psection)
                 <tr>
                    <td scope="row" colspan="3">{{ $psection['menu_name'] }}</td>
                </tr>
                 @foreach ($psection['sections'] as $section)
                    <tr>
                        <td scope="row" colspan="3">{{ $section['menu_name'] }}</td>
                    </tr>
                @endforeach
                @foreach ($section['controls'] as $control)
                    <tr>
                    <td scope="row">{{ $control['number'] }}</td>
                    <td>{{ $control['name'] }}</td>
                    <td>{{ $control['applicability']['applicable'] }}</td>
                    @if($control['applicability']['applicable'] == 'Not Applicable')
                        <td>{{ $control['applicability']['justification'] }}</td>
                    @else
                    <td>
                      @foreach ($control['the_artifacts'] as $artifact)
                        <div>{{ $artifact['document']['name'] }}, </div>
                      @endforeach
                    </td>
                    @endif
                    </tr>
                @endforeach
            @endforeach
        </tbody>
    </table>
</body>
</html>
