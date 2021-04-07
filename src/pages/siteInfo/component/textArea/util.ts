export function escapeData(data: string): string {
  return data
    .replace(
      /<input\stype="text"\sdata-formula="e=mc\^2"\sdata-link="quilljs\.com"\sdata-video="Embed\sURL"\splaceholder="Embed\sURL">/g,
      '',
    )
    .replace(/<\/?script>+|傻逼+|爸爸+|你爸+|SB+|sB+|sb+|操+|你妈/g, '**');
}
